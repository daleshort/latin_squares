from typing import List, Tuple

class Board:
    def __init__(self, row: Tuple[int,int], col: Tuple[int,int], regions: List[Tuple[int, int]]) -> None:
        self.row = row
        self.col = col
        self.regions = regions

Parts = Board((1,6),(6,1),[(2,3),(3,2)])
print(Parts)
print(Parts.row)
print(Parts.col)
print(Parts.regions)

print('')

def MakePuzzle(WhatIsLatin: Board = Board((1,6),(6,1),[(2,3),(3,2)])):
    LatinList = [WhatIsLatin.row, WhatIsLatin.col]
    for i in WhatIsLatin.regions:
        LatinList.append(i)
    return LatinList

print(MakePuzzle(Parts))