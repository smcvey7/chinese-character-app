class ClassGroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :teacher_id, :uuid, :students

  belongs_to :teacher
  has_many :registrations
  has_many :students, through: :registrations
  # has_many :tests, through: :students
end
