class ClassGroup < ApplicationRecord
  belongs_to :teacher
  has_many :students
  has_many :tests, through: :students
end
