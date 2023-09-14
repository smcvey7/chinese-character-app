class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :first_language, :country, :school, :class_group_id, :years_studied, :scores, :tests, :teacher, :class_group, :role

  belongs_to :class_group
  has_one :teacher, through: :class_group
  has_many :tests
end
