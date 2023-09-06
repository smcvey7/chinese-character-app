class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :first_name, :last_name, :first_language, :country, :state, :school, :class_id, :years_studied, :scores
end
