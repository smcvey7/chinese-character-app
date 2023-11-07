class Student < ApplicationRecord
  has_many :registrations
  has_many :class_groups, through: :registrations
  has_many :teachers, through: :class_groups
  has_many :tests

  has_secure_password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :username, {presence: true, uniqueness: true, format: { with: /\A[a-z0-9\-_.]{5,15}\z/, message: "must be between 5-15 characters and may not contain special characters" }}
  validates :email, {presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }}
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, {presence: true, length: {minimum: 6}, format: { with: /\A[a-zA-Z0-9!$#%^&*?\/\-_.+]{6,15}\z/, message: "must be between 6-15 characters and may only contain lowercase and capital letters, numbers, and !$#%^&*?/-_+." }, allow_blank: true}
  validates :password_confirmation, {presence: true, length: {minimum: 6}, format: { with: /\A[a-zA-Z0-9!$#%^&*?\/\-_.+]{6,15}\z/, message: "must be between 6-15 characters and may only contain lowercase and capital letters, numbers, and !$#%^&*?/-_+." }, allow_blank: true}
end
