class Teacher < ApplicationRecord
  has_many :classGroups
  has_many :students, through: :classGroups
  has_many :tests, through: :students
end
