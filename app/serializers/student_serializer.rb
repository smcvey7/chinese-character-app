class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :first_language, :country, :school, :scores, :tests, :teachers, :role, :age, :other_L2, :home_learning, :class_learning, :other_info, :class_groups

  has_many :registrations
  # has_many :class_groups, through: :registrations 
  has_many :tests
end
