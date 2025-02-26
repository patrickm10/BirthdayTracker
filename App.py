from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///birthdays.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Birthday(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Birthday {self.name}>'

@app.route('/')
def index():
    birthdays = Birthday.query.all()
    return render_template('index.html', birthdays=birthdays)

@app.route('/add', methods=['POST'])
def add_birthday():
    name = request.form.get('name')
    date = request.form.get('date')
    if name and date:
        new_birthday = Birthday(name=name, date=datetime.strptime(date, '%Y-%m-%d'))
        db.session.add(new_birthday)
        db.session.commit()
    return redirect(url_for('index'))

@app.route('/delete/<int:id>')
def delete_birthday(id):
    birthday = Birthday.query.get_or_404(id)
    db.session.delete(birthday)
    db.session.commit()
    return redirect(url_for('index'))

def main():
    # Create all tables inside an application context
    with app.app_context():
        db.create_all()
    app.run(debug=True)

if __name__ == '__main__':
    main()
