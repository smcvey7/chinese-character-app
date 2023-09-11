class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :country, :school, :admin, :students, :tests, :role
end
