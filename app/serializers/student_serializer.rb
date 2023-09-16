class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :first_language, :country, :school, :class_group_id, :scores, :tests, :teacher, :class_group, :role, :age, :other_L2, :home_learning, :class_learning, :other_info

  belongs_to :class_group
  has_many :tests
end
