class Teacher < ApplicationRecord
  has_many :classGroups
  has_many :students, through: :classGroups
  has_many :tests, through: :students

  has_secure_password

  validates :username, {presence: true, uniqueness: true}
  validates :email, {presence: true, uniqueness: true}
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, {presence: true, length: {minimum: 6}}
  
end
