class ClassGroup < ApplicationRecord
  belongs_to :teacher
  has_many :students
  has_many :tests, through: :students

  def self.teacher_name class_group
    teacher = Teacher.find_by(id: class_group.teacher_id)
    
    "#{teacher.first_name} #{teacher.last_name}"
  end

end
