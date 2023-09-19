class Teacher < ApplicationRecord
  has_many :class_groups
  has_many :students, through: :class_groups
  has_many :tests, through: :students

  has_secure_password

  validates :username, {presence: true, uniqueness: true}
  validates :email, {presence: true, uniqueness: true}
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, {length: {minimum: 6}}
  
end
