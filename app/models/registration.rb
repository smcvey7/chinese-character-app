class Registration < ApplicationRecord
  belongs_to :class_group
  has_one :teacher, through: :class_group
  
  belongs_to :student
  has_many :tests, through: :student

  validates :student_id, presence: true, uniqueness: { scope: :class_group_id, message: "already registered for this class." }
end
