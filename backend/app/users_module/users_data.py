import numpy as np
import pandas as pd
from app.utils import update_table 

users_data = pd.DataFrame(np.array(
[
  [
    '1',
    'http://localhost:5000/images/banner-1.webp',
    'Silvia Martínez',
    True,
  ],
  [
    '2',
    'http://localhost:5000/images/banner-2.webp',
    'Marina Prieto',
    True,
  ],
  [
    '3',
    'http://localhost:5000/images/banner-3.webp',
    'Alma Villalobos',
    False,
  ],
  [
    '4',
    'http://localhost:5000/images/banner-4.webp',
    'Isabela Pavía',
    False,
  ],
  [
    '5',
    'http://localhost:5000/images/banner-5.webp',
    'Donato Castillo',
    False,
  ],
], dtype=object
), columns=['id',
'image',
'name',
'isFav'])

update_user = update_table(users_data)

  
    



