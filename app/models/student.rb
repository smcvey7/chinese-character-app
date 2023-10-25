class Student < ApplicationRecord
  has_many :registrations
  has_many :class_groups, through: :registrations
  has_many :teachers, through: :class_groups
  has_many :tests

  has_secure_password

  validates :username, {presence: true, uniqueness: true}
  validates :email, {presence: true, uniqueness: true}
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, {presence: true, length: {minimum: 6}, allow_blank: true}
  validates :password_confirmation, {presence: true, allow_blank: true}
end
