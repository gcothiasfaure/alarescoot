import requests

def get_scooter_data_from_yego():
    response = requests.get("https://yugo-assets.s3-eu-west-3.amazonaws.com/landing/data/markers-city-4.json")
    scoot_list = []
    for scoot in response.json():
        if int(scoot['battery'])<20:
            level = "low"
        elif int(scoot['battery'])<50:
            level = "medium"
        else:
            level = 'high'
        scoot_list.append({
            'id':'yego-'+str(scoot['id']),
            'autonomy':{'number':int(scoot['battery']),'type':'%','level':level},
            'coords':{'latitude':round(scoot['lat'],5),'longitude':round(scoot['lng'],5)},
            'public_id':{'text':scoot['name'],'type':'name'},
            'operator':{'lib':'Yego','id':'yego'}
        })
    return scoot_list

def get_scooter_data_from_cooltra():
    headers = {"user-agent": "ecooltra/5.0.44 (com.mobime.eCooltra; build:710; iOS 16.7.8; iPhone 8)"}
    response = requests.get("https://api.zeus.cooltra.com/mobile_cooltra/v1/vehicles?system_id=paris", headers=headers)
    scoot_list = []
    for scoot in response.json():
        if int(scoot['range']/1000)<20:
            level = "low"
        elif int(scoot['range']/1000)<40:
            level = "medium"
        else:
            level = 'high'
        scoot_list.append({
            'id':'cooltra-'+str(scoot['id']),
            'autonomy':{'number':int(scoot['range']/1000),'type':'km','level':level},
            'coords':{'latitude':round(scoot['position'][1],5),'longitude':round(scoot['position'][0],5)},
            'public_id':{'text':scoot['license_plate'][:2]+"-"+scoot['license_plate'][2:5]+ "-"+scoot['license_plate'][5:],'type':'plate'},
            'operator':{'lib':'Cooltra','id':'cooltra'}
        })
    return scoot_list