class TestSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :score, :version, :complete, :items, :char_num
end
