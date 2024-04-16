import sqlite3

# Function to initialize the database
def initialize_database():
    conn = sqlite3.connect('parking.db')
    cursor = conn.cursor()

    # Create table for customer vehicles
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY,
            plate_number TEXT NOT NULL,
            vehicle_type TEXT NOT NULL
        )
    ''')

    # Create table for parking locations
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS parking_locations (
            id INTEGER PRIMARY KEY,
            location_name TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            available_spots INTEGER NOT NULL
        )
    ''')

    # Example data for parking locations
    locations_data = [
        ('Parking Lot A', 50, 50),
        ('Parking Lot B', 30, 30),
        ('Parking Lot C', 20, 20)
    ]

    # Insert example data into parking_locations table
    cursor.executemany('INSERT INTO parking_locations (location_name, capacity, available_spots) VALUES (?, ?, ?)', locations_data)

    # Commit changes and close connection
    conn.commit()
    conn.close()

# Function to add a new vehicle
def add_vehicle(plate_number, vehicle_type):
    conn = sqlite3.connect('parking.db')
    cursor = conn.cursor()

    # Insert new vehicle into vehicles table
    cursor.execute('INSERT INTO vehicles (plate_number, vehicle_type) VALUES (?, ?)', (plate_number, vehicle_type))

    # Commit changes and close connection
    conn.commit()
    conn.close()

# Function to list all vehicles
def list_vehicles():
    conn = sqlite3.connect('parking.db')
    cursor = conn.cursor()

    # Retrieve all vehicles from vehicles table
    cursor.execute('SELECT * FROM vehicles')
    vehicles = cursor.fetchall()

    # Print list of vehicles
    for vehicle in vehicles:
        print(vehicle)

    # Close connection
    conn.close()

# Function to list all parking locations
def list_parking_locations():
    conn = sqlite3.connect('parking.db')
    cursor = conn.cursor()

    # Retrieve all parking locations from parking_locations table
    cursor.execute('SELECT * FROM parking_locations')
    locations = cursor.fetchall()

    # Print list of parking locations
    for location in locations:
        print(location)

    # Close connection
    conn.close()

# Initialize the database
initialize_database()

# Add some example vehicles
add_vehicle('ABC123', 'Car')
add_vehicle('XYZ789', 'Motorcycle')

# List all vehicles
print("List of Vehicles:")
list_vehicles()

# List all parking locations
print("\nList of Parking Locations:")
list_parking_locations()
