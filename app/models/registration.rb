class Registration < ApplicationRecord
  belongs_to :class_group
  has_one :teacher, through: :class_group
  
  belongs_to :student
  has_many :tests, through: :student
end
