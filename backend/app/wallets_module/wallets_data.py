import numpy as np
import pandas as pd
from app.utils import update_table 

wallets_data = pd.DataFrame(np.array([
    [
        '1',
        '5d33C280017d58cbFdAFd7eE3F43a003',
        27.05
    ],
    [
        '1',
        '0448930b2478f9FbA17988187c968322',
        86.78
    ],
    [
        '2',
        'e9aAB03D9a22e707FaB9648F4c80B321',
        36.70
    ],
    [
        '3',
        'E3f9DCfcb95157Ae300CA3dCfB82e338',
        19.08
    ],
    [
        '3',
        '63F834A7Bb42105dd9d33a70f343F6aE',
        35.67
    ],
    [
        '3',
        '28b3b7574CA44A252e550621855a489f',
        49.55
    ],
    [
        '4',
        'EF14BF2B777887E072FB2B71Ff6f8a9d',
        44.43
    ],
    [
        '5',
        '5032fA611BD3fD39E69b2B945D773249',
        53.30
    ],
    [
        '5',
        'Ba36B34932d95eBE18904516A36d0C48',
        51.42
    ],
    [
        '5',
        'C837901195a53219530a4E888DfBeaA2',
        31.65
    ],
    
], dtype=object), columns=['user_id', 'hash', 'coins'])

update_wallet = update_table(wallets_data)
