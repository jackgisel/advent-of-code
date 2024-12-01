from collections import Counter

with open("2023/day_7.txt") as f:
    lines = f.read().strip().split("\n")

rankings = list(reversed(["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]))
hand_rankings = list(reversed(["FIVE", "FOUR", "FULL", "THREE", "TWO", "ONE", "DEFAULT"]))

def get_hand(hand_string) -> tuple:
    hand_to_nums = [rankings.index(card) for card in hand_string]
    counts = Counter(hand_to_nums).values()
    
    if 5 in counts:
        hand_ranking_score = hand_rankings.index("FIVE")
        return [num * hand_ranking_score for num in hand_to_nums]

def compare_hands(first, second):
    pass


print(get_hand("32T3K"))