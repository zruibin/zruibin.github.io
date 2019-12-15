#! /usr/bin/python
# coding=utf-8
# 
# server.py
# zruibin.cc
#
# Created by Ruibin.Chow on 15/12/31.
# Copyright (c) 2015年 www.zruibin.cc. All rights reserved.
#

import base64, os, zipfile, random, shutil
import hashlib
import getpass

zipDir = './build'
zipName = 'build.zip'
encryptName = 'srv.d'
encryptKeyAndPasswork = False


def getAllFileInDir(DIR):
    """返回指定目录下所有文件的集合"""
    array = []
    for root, dirs, files in os.walk(DIR):
        for name in files:
            path = root + '/' + name
            array.append(path)
            # print os.path.basename(name)
    return array

def show(DIR):
    """列出指定目录下所有文件"""
    array = getAllFileInDir(DIR)
    for path in array:
        print path
        # basename = os.path.basename(path)
        # print basename
        # print basename.decode('utf-8')
    pass


def getTheFileContent(fileName):
    """获得文件的内容"""
    fp = open(fileName, 'r') 
    allText = fp.read()
    fp.close()
    return allText


def writeContentToFile(fileName, content, mode='w'):
    """以特定的方式向文件写内容"""
    fp = open(fileName, mode)
    fp.write(content)
    fp.close()
    pass


def convert_character(string, origin_string, replace_string):
    """用指定的字符替换文本中指定的字符"""
    string = string.replace(origin_string, replace_string)
    return string



def zip():
    array = getAllFileInDir(zipDir)
    z = zipfile.ZipFile(zipName, 'w')
    for fileName in array:
        z.write(fileName)
    z.close() 
    pass

# def unZip(fileName):
#     zfile = zipfile.ZipFile(fileName,'r')
#     for filename in zfile.namelist():
#         data = zfile.read(filename)
#         file = open(filename, 'w+b')
#         file.write(data)
#         file.close()

#     pass

def encodeFile():
    obj = keyAndPassword()
    content = getTheFileContent(zipName)
    content = base64.b64encode(content)
    content = encryptContent(content, obj)
    writeContentToFile(encryptName, content)
    os.remove(zipName)
    shutil.rmtree(zipDir)
    pass

def decodeFile():
    obj = keyAndPassword()
    content = getTheFileContent(encryptName)
    content = decryptContent(content, obj)
    content = base64.b64decode(content)
    writeContentToFile(zipName, content)
    os.remove(encryptName)
    pass


def keyAndPassword():
    key = raw_input("key:")
    password = getpass.getpass("password:")
    print 'key: ' + str(key) + '---' + 'password length: ' + str(len(password))
    obj = dict()
    obj['key'] = hashlib.sha256(key).hexdigest()
    obj['password'] = hashlib.sha256(password).hexdigest()
    return obj

def encryptContent(content, obj):
    data = '<--' + str(obj['key']) + str(obj['password']) + '-->'
    if encryptKeyAndPasswork:
        data = base64.b64encode(data)
    length = len(content)
    insertIndex = random.randint(1, length)
    content = content[:insertIndex] + data + content[insertIndex:]
    return content

def decryptContent(content, obj):
    data = '<--' + str(obj['key']) + str(obj['password']) + '-->'
    content = convert_character(content, data, '')
    return content


def Main():
    option = raw_input("encode(1) or decode(2):")
    if int(option) == 1:
        zip()
        encodeFile()
    if int(option) == 2:
        decodeFile()
    pass





if __name__ == '__main__':
    Main()
    pass

