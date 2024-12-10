from flask import Flask, render_template, request, redirect, flash, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Kullanıcı modelini tanımlayın
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Veritabanını oluştur
with app.app_context():
    db.create_all()

# Kayıt formu rotası
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            flash('Şifreler eşleşmiyor. Lütfen tekrar deneyin.')
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(fullname=fullname, email=email, username=username, password=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Kayıt başarılı! Giriş yapabilirsiniz.')
            return redirect(url_for('login'))
        except:
            flash('Bu e-posta veya kullanıcı adı zaten kullanılıyor.')
            return redirect(url_for('register'))

    return render_template('register.html')

# Giriş formu rotası
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            flash('Giriş başarılı!')
            return redirect(url_for('dashboard'))
        else:
            flash('Geçersiz kullanıcı adı veya şifre.')
            return redirect(url_for('login'))

    return render_template('login.html')

# Gösterge paneli rotası
@app.route('/dashboard')
def dashboard():
    return "Dashboard'a hoş geldiniz!"

if __name__ == '__main__':
    app.run(debug=True)
