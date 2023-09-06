class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :first_language
      t.string :country
      t.string :state
      t.string :school
      t.integer :class_id
      t.integer :years_studied
      t.json :scores, default: {}, null: false

      t.timestamps
    end
  end
end
