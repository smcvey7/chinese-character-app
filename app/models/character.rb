class Character < ApplicationRecord

  def self.tested(char_id, correct)
    puts "char_num: #{char_id} correct: #{correct}"
    char = Character.find(char_id)
    
    char.appeared += 1
    if correct
      char.correct += 1
    end
    char.save
  end

end
