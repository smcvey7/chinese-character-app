class ClassGroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :teacher_id, :uuid, :level, :students, :tests

  belongs_to :teacher
  has_many :students
end
