class ClassGroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :teacher_id, :uuid, :level, :students

  belongs_to :teacher
  has_many :students
  # has_many :tests, through: :students
end
