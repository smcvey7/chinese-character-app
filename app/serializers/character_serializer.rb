class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :simplified, :traditional, :hsk_level, :appeared, :correct, :pinyin, :choices, :checked, :components, :strokes, :incorrect
end
