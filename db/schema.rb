# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170319002818) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_units", force: :cascade do |t|
    t.string   "name",          null: false
    t.integer  "company_id",    null: false
    t.date     "founding_date"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["company_id"], name: "index_business_units_on_company_id", using: :btree
    t.index ["name"], name: "index_business_units_on_name", using: :btree
  end

  create_table "companies", force: :cascade do |t|
    t.string   "name",         null: false
    t.integer  "industry_id"
    t.string   "url"
    t.string   "city"
    t.string   "state"
    t.string   "logo_img_url"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["industry_id"], name: "index_companies_on_industry_id", using: :btree
    t.index ["name"], name: "index_companies_on_name", unique: true, using: :btree
  end

  create_table "industries", force: :cascade do |t|
    t.string   "name",               null: false
    t.integer  "parent_industry_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["name"], name: "index_industries_on_name", unique: true, using: :btree
    t.index ["parent_industry_id"], name: "index_industries_on_parent_industry_id", using: :btree
  end

  create_table "metric_types", force: :cascade do |t|
    t.string   "name",                  null: false
    t.integer  "parent_metric_type_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["name"], name: "index_metric_types_on_name", unique: true, using: :btree
    t.index ["parent_metric_type_id"], name: "index_metric_types_on_parent_metric_type_id", using: :btree
  end

  create_table "metrics", force: :cascade do |t|
    t.string   "metric_name",       null: false
    t.integer  "metric_type_id",    null: false
    t.string   "function"
    t.integer  "user_id",           null: false
    t.integer  "company_id",        null: false
    t.integer  "business_unit_id"
    t.float    "value",             null: false
    t.string   "value_description", null: false
    t.string   "geo"
    t.date     "relevant_date",     null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["company_id"], name: "index_metrics_on_company_id", using: :btree
    t.index ["function"], name: "index_metrics_on_function", using: :btree
    t.index ["metric_name"], name: "index_metrics_on_metric_name", using: :btree
    t.index ["metric_type_id"], name: "index_metrics_on_metric_type_id", using: :btree
    t.index ["user_id"], name: "index_metrics_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

end
