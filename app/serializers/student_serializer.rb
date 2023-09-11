class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :first_language, :country, :school, :class_group_id, :years_studied, :scores, :tests, :teacher, :class_group, :role
end
