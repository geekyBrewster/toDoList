/* Create initial table */
CREATE TABLE "todos" (
	"id" serial primary key,
	"task" varchar(120) not null,
	"completed" boolean
);

/* Add sample tasks */
INSERT INTO "todos" ("task", "completed")
VALUES ('Feed Hedwig', false), ('Visit Hagrid', true), ('Defeat Voldemort', false);