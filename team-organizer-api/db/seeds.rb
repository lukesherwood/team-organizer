# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# dump database before creating?
#USER
user1 = User.create(name: "Bobby Joe", email: "test@email.com", phone_number: "0211982098")
admin = User.create(name: "Admin", email: "admin@email.com", phone_number: "12220228741")
user3 = User.create(name: "Rose Caputo", email: "rose@email.com", phone_number: "02123522099")
#players
player1 = User.create(name: "Matt Dingus", email: "matt@email.com", phone_number: "021235234099")
player2 = User.create(name: "Fella Ratio", email: "fella@email.com", phone_number: "021234522099")
player3 = User.create(name: "Freddy Mercurial", email: "fred@email.com", phone_number: "021233932099")
#TEAM
soccer_team = Team.create(name: "Soccer Sport Group", description:"Wellingtons finest soccer players assemble at thursdays, Wakefield Park, FREE")
netball_team = Team.create(name: "Netball Sport Crew", description:"Aucklands finest netball players join and be a part of greatness")
#EVENT
event1 = netball_team.events.create(name: "Thursday Social Netball", start_time: "2020-08-02 18:03:34.0177401 +1200", end_time: "2020-08-02 20:03:34.0177401 +1200", description: "bring along a ball and we'll train for 30 mins then have a game", location: "ASB Arena", creator_id: user3.id)
event2 = soccer_team.events.create(name: "Tuesday Social Futsal", start_time: "2020-08-04 20:03:34.0177401 +1200", end_time: "2020-08-04 22:03:34.0177401 +1200", description: "Max 12 people please remember to bring $10", location: "ASB Arena", creator_id: admin.id)
event3 = soccer_team.events.create(name: "Sunday Social football", start_time: "2020-08-06 11:03:34.0177401 +1200", end_time: "2020-08-06 12:03:34.0177401 +1200", description: "11am make sure to come enough time to warm-up before the game", location: "Boyd Wilson", creator_id: user1.id)

#relationships "%Y-%m-%d %H:%M:%S"
user1.team = soccer_team
admin.team = soccer_team
user3.team = netball_team
player1.team = soccer_team
player2.team = soccer_team
player3.team = netball_team
event1.players.push(player1, player2)
event2.players.push(player3, player2)
event3.players.push(player1, player2, player3)