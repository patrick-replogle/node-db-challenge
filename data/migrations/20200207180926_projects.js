exports.up = async function(knex) {
  await knex.schema.createTable("projects", table => {
    table.increments("id");
    table
      .string("project_name")
      .notNullable()
      .unique();
    table
      .string("project_description")
      .notNullable()
      .defaultTo("");
    table
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
  });

  await knex.schema.createTable("resources", table => {
    table.increments("id");
    table.string("resource_name").notNullable();
    table
      .string("resource_description")
      .notNullable()
      .defaultTo("");
  });

  await knex.schema.createTable("tasks", table => {
    table.increments("id");
    table.string("task_description").notNullable();
    table
      .text("task_notes")
      .notNullable()
      .defaultTo("");
    table
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
    table
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("project_resources", table => {
    table.primary(["project_id", "resource_id"]);
    table
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("resource_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("resources")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("project_resources");
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("projects");
};
