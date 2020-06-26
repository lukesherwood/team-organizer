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
#TEAM
soccer_team = Team.create(name: "Soccer Sport Group", description:"Wellingtons finest soccer players assemble at thursdays, Wakefeild Park, FREE")
netball_team = Team.create(name: "Netball Sport Crew", description:"Aucklands finest netball players join and be a part of greatness")
#EVENT
event1 = user1.events.create(name: "Thursday Social Netball", start_time: Time.now, end_time: Time.now, description: "bring along a ball and we'll train for 30 mins then have a game", location: "ASB Arena")
event2 = admin.events.create(name: "Tuesday Social Futsal", start_time: Time.now, end_time: Time.now, description: "Max 12 people please remember to bring $10", location: "ASB Arena")
event3 = user2.events.create(name: "Sunday Social football", start_time: Time.now, end_time: Time.now, description: "11am make sure to come enough time to warm-up before the game", location: "Boyd Wilson")

#relationships
user1.team = soccer_team
admin.team = soccer_team
user3.team = netball_team
event1.creator = user3
event2.creator = user1
event3.creator = admin