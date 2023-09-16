class ChangeCharNumDefaultInTests < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tests, :char_num, default: 0, null: false
  end
end
