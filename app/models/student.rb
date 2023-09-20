class Student < ApplicationRecord
  belongs_to :class_group
  has_one :teacher, through: :class_group
  has_many :tests

  has_secure_password

  validates :class_group_id, {presence: true}
  validates :username, {presence: true, uniqueness: true}
  validates :email, {presence: true, uniqueness: true}
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, {presence: true, length: {minimum: 6}, allow_blank: true}
  validates :password_confirmation, {presence: true, allow_blank: true}
end
