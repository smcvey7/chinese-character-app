class AddColumnScoresToStudents < ActiveRecord::Migration[6.1]
  def change
    add_column :students, :scores, :integer, array: true, default: []
  end
end
