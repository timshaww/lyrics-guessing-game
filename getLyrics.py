import requests

# Base URL for the lyrics API
base_url = "https://api.lyrics.ovh/v1/"

# List of endpoints (song artist and title)
endpoints = [
    'Mark%20Ronson/Uptown%20Funk%20(feat.%20Bruno%20Mars)',
    'LMFAO/Party%20Rock%20Anthem',
    'Ed%20Sheeran/Shape%20of%20You',
    'The%20Chainsmokers/Closer',
    'Maroon%205/Girls%20Like%20You%20(Cardi%20B%20Version)',
    'Rihanna/We%20Found%20Love%20(Album%20Version)',
    'Lil%20Nas%20X/Old%20Town%20Road',
    'Gotye/Somebody%20That%20I%20Used%20To%20Know',
    '',
    'Adele/Rolling%20in%20the%20Deep',
    'Post%20Malone/Sunflower%20(Spider-Man:%20Into%20the%20Spider-Verse)',
    'Halsey/Without%20Me',
    'Carly%20Rae%20Jepsen/Call%20Me%20Maybe',
    'Robin%20Thicke/Blurred%20Lines',
    'Ed%20Sheeran/Perfect',
    'Travis%20Scott/SICKO%20MODE',
    'All%20About%20That%20Bass',
    'Lorde/Royals',
    "Drake/God's%20Plan",
    'Maroon%205/Moves%20Like%20Jagger',
    'Pharrell%20Williams/Happy%20(From%20%22Despicable%20Me%202%22)',
    'Bruno%20Mars/Just%20the%20Way%20You%20Are',
    'Post%20Malone/rockstar',
    'Kesha/TiK%20ToK',
    'Wiz%20Khalifa/See%20You%20Again%20(feat.%20Charlie%20Puth)',
    'Katy%20Perry/Dark%20Horse',
    '',
    'Maroon%205/One%20More%20Night',
    'fun./We%20Are%20Young%20(feat.%20Janelle%20Mon%C3%A1e)',
    "Bruno%20Mars/That's%20What%20I%20Like",
    '',
    'John%20Legend/All%20of%20Me',
    '',
    'Taylor%20Swift/Shake%20It%20Off',
    'Drake/One%20Dance',
    'Imagine%20Dragons/Radioactive',
    'LMFAO/Sexy%20And%20I%20Know%20It',
    'Adele/Someone%20Like%20You',
    'OneRepublic/Counting%20Stars',
    '',
    'Fetty%20Wap/Trap%20Queen',
    'Justin%20Bieber/Love%20Yourself',
    'Katy%20Perry/Firework',
    'Pitbull/Give%20Me%20Everything%20(feat.%20Nayer)',
    'Bruno%20Mars/Locked%20out%20of%20Heaven',
    'Eminem/Love%20The%20Way%20You%20Lie',
    'Ed%20Sheeran/Thinking%20out%20Loud',
    'Justin%20Bieber/Sorry',
    'Katy%20Perry/California%20Gurls',
    'Taio%20Cruz/Dynamite',
]

def lyrics_to_array(lyrics_text):
    # Split the lyrics by newline
    lines = lyrics_text.splitlines()
    # Filter out empty lines and create an array with each line as a separate string
    lyrics_array = [f'"{line.strip()}"' for line in lines if line.strip()]
    # Join the array into the desired format for output
    output = ',\n'.join(lyrics_array)
    # Add the array brackets
    output = f'[{output}]'
    return output

def fetch_lyrics(endpoints):
    for endpoint in endpoints:
        if not endpoint:  # Skip empty entries
            continue
        
        url = base_url + endpoint
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json().get('lyrics', '')  # Get lyrics from response
                formatted_lyrics = lyrics_to_array(data)  # Convert lyrics to array format
                print(f"Array for {endpoint}:")
                print(formatted_lyrics)
                print("\n")  # Add a blank line between arrays for readability
            else:
                print(f"Failed to fetch data from {endpoint}, status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred while fetching from {endpoint}: {e}")

# Run the script to fetch and print formatted lyrics
fetch_lyrics(endpoints)
