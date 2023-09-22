class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :country, :school, :admin, :role

  has_many :class_groups
  # has_many :students, through: :class_groups
  has_many :tests, through: :students
  
end
