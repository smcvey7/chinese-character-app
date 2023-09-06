class Test < ApplicationRecord
  belongs_to :student
  has_one :class_group, through: :student
  has_one :teacher, through: :class_group
end
