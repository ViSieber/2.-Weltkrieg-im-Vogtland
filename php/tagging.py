from bs4 import BeautifulSoup
import nltk
from HanTa import HanoverTagger as ht
import argparse

def getText(fname):
    with open(fname, "r") as file:
        data = file.read()
        bs = BeautifulSoup(data, "xml")

        infoElements = bs.find_all("info")

        for e in infoElements:
            text = e.text
            tagText(text)

def tagText(text):
    wordsfromtagger = [];
    tagger = ht.HanoverTagger("morphmodel_ger.pgz")

    sentences = nltk.sent_tokenize(text, language="german")

    for s in sentences:
        words = nltk.tokenize.word_tokenize(s, language="german")

        word, lemma, pos = tagger.tag_sent(words)
        
        if pos == "NN" or pos == "NE" or pos == "JJ":
            wordsfromtagger.append(lemma)

    return wordsfromtagger

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("-i", action="store", help="init Text")
    parser.add_argument("-s", action="store", help="searchh a word")
    args = parser.parse_args()

    if args.i != None and args.i != "":
        getText(args.i)
    
    elif args.s != None and args.s != "":
        pass