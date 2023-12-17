from fastapi import FastAPI
from geopy import distance
from functions import get_scooter_data_from_cooltra,get_scooter_data_from_cityscoot,get_scooter_data_from_yego

app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World we are here at 19:04"}

@app.get('/nearest-10-scooters-2-helmets')
def nearest_10_scooters_2_helmets(lat : float,lng : float):
    
    global_scoots = get_scooter_data_from_cooltra()+get_scooter_data_from_cityscoot()+get_scooter_data_from_yego()

    for scoot in global_scoots:
        scoot['distance'] = int(distance.distance((lat,lng), (scoot['coords']["latitude"],scoot['coords']["longitude"])).m)

    return {"data":sorted(global_scoots, key=lambda d: d['distance'])[:10]}