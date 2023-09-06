class Student < ApplicationRecord
  belongs_to :class_group
  has_one :teacher, through: :class_group
  has_many :tests
end
