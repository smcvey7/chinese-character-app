class AddColumnsToStudents < ActiveRecord::Migration[6.1]
  def change
    add_column :students, :class_learning, :integer
    add_column :students, :age, :integer
    add_column :students, :other_L2, :string
    add_column :students, :other_info, :text
  end
end
