class ClassGroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :teacher_id, :uuid, :level, :students, :tests

end
