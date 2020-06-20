import { DataTypes, Database, Model } from "https://deno.land/x/denodb/mod.ts";

const db = new Database('mysql', {
  database: 'energymanage',
  host: 'db',
  username: 'root',
  password: 'example',
  port: 3306, // optional
});

class Flight extends Model {
  static table = 'flights';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    flightDuration: DataTypes.FLOAT,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

db.link([Flight]);

await db.sync({ drop: true });

await Flight.create({
  departure: 'Paris',
  destination: 'Tokyo',
});

await Flight.create({
  departure: 'Paris',
  destination: 'San Francisco',
});


await Flight.select('destination').all();
// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

await Flight.where('destination', 'Tokyo').delete();

const sfFlight = await Flight.select('destination').find(2);
// { destination: "San Francisco" }

await Flight.count();
// 1

await Flight.select('id', 'destination').orderBy('id').get();
// [ { id: "2", destination: "San Francisco" } ]

try {
  await sfFlight.delete();
} catch (e) {
  console.log('error in delete sfFlight');
}

await db.close();