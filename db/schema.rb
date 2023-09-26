# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_09_24_190927) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "simplified"
    t.string "traditional"
    t.integer "hsk_level"
    t.integer "appeared", default: 0
    t.integer "correct", default: 0
    t.string "pinyin", default: [], null: false, array: true
    t.string "choices", default: ["", "", "", ""], null: false, array: true
    t.boolean "checked", default: false
    t.integer "components", default: 0
    t.integer "strokes", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "incorrect", default: [], null: false, array: true
  end

  create_table "class_groups", force: :cascade do |t|
    t.string "name"
    t.integer "teacher_id"
    t.string "uuid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "first_language"
    t.string "country"
    t.string "school"
    t.integer "class_group_id"
    t.integer "home_learning"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "role", default: "student"
    t.integer "scores", default: [], array: true
    t.integer "class_learning"
    t.integer "age"
    t.string "other_L2"
    t.text "other_info"
  end

  create_table "teachers", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "country"
    t.string "school"
    t.boolean "admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "role", default: "teacher"
  end

  create_table "tests", force: :cascade do |t|
    t.integer "student_id"
    t.integer "score"
    t.integer "version"
    t.jsonb "items", default: [], null: false, array: true
    t.boolean "complete"
    t.integer "char_num"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
