from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

#app = Flask(__name__)
app = Flask(__name__, template_folder='')
app.secret_key = 'your_secret_key'

# Veritabanı yapılandırması
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
    

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)


with app.app_context():
    db.create_all()


def initialize_cart():
    if 'cart' not in session:
        session['cart'] = []

@app.route('/')
def home():
    categories = Category.query.all()
    userdata = { 'login': False, 'name': '', 'id': 0, 'categories': categories }
    if 'user_id' in session:
       userdata = { 'login': True, 'name': session['username'], 'id': session['user_id'], 'categories': categories }
    return render_template('index.html', **userdata)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        
        if password != confirm_password:
            flash('Şifreler eşleşmiyor. Lütfen tekrar deneyin.', 'danger')
            return redirect(url_for('register'))

        
        existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
        if existing_user:
            flash('E-posta veya kullanıcı adı zaten kayıtlı.', 'danger')
            return redirect(url_for('register'))

        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        try:
            
            new_user = User(fullname=fullname, email=email, username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            flash('Kayıt başarılı! Şimdi giriş yapabilirsiniz.', 'success')
            return redirect(url_for('login'))

        except Exception as e:
            db.session.rollback()
            flash(f'Bir hata oluştu: {e}', 'danger')
            return redirect(url_for('register'))
    return render_template('/register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['username'] = user.username
            flash('Başarıyla giriş yaptınız.', 'success')
            return redirect(url_for('home'))

        flash('Hatalı e-posta veya şifre.', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Başarıyla çıkış yaptınız.', 'success')
    return redirect(url_for('home'))


@app.route('/products/<int:category_id>')
def products(category_id):
    if 'user_id' not in session:
        flash('Ürünleri görmek için giriş yapmalısınız.', 'danger')
        return redirect(url_for('login'))
    
    products = Product.query.filter_by(category_id=category_id).all()
    category = Category.query.get(category_id)
    model = {'products': products, 'category': category}
    return render_template('products.html', **model)


@app.route('/add_to_cart/<int:product_id>', methods=['POST'])
def add_to_cart(product_id):
    initialize_cart()
    product = Product.query.get(product_id)
    if product:
        session['cart'].append({'id': product.id, 'name': product.name, 'price': product.price})
        session.modified = True
        flash(f'{product.name} sepete eklendi.', 'success')
    else:
        flash('Ürün bulunamadı.', 'danger')
    return redirect('/products/'+str(product.category_id))

@app.route('/iade')
def iade():
    return render_template('iade.html')

@app.route('/cart')
def view_cart():
    initialize_cart()
    cart = session['cart'];
    ids = []
    for item in cart:
        ids.append(item['id'])
    products = Product.query.filter(Product.id.in_(ids)).all()
    cart_total = sum(item.price for item in products)
    model = { 'cart': cart, 'cart_total': cart_total }
    return render_template('cart.html', **model)


@app.route('/clear_cart', methods=['POST'])
def clear_cart():
    session.pop('cart', None)
    flash('Sepet temizlendi.', 'success')
    return redirect(url_for('view_cart'))

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/support')
def support():
    return render_template('support.html')


@app.route('/categories')
def categories():
    cats = Category.query.all()
    view = { 'login': '', 'categories': cats }
    return render_template('categories.html', **view)

@app.route('/get_cart', methods=['POST'])
def get_cart():
    cart = session['cart'];
    ids = []
    for item in cart:
        ids.append(item['id'])
    products = Product.query.filter(Product.id.in_(ids)).all()
    prod_list = []
    for product in products:
        prod_list.append({'id': product.id, 'name': product.name, 'price': product.price})
    return {'cart': prod_list}
@app.route('/faq')
def faq():
    return render_template('faq.html')
@app.route('/degerlendirme')
def degerlendirme():
    return render_template('degerlendirme.html')

if __name__ == '__main__':
    app.run(debug=True)

