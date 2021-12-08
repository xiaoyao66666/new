let ip = 'http://116.62.58.101:8082/'

import {deletes, get,post,put} from '../axios/axios'

export const API = {
    /**
     * 用户登录
     * @param {*} param0 
     * @returns 
     */
    user_login({data}={}){
        return post(`${ip}api/user/login`,data)
    },

    /**
     * 获取课程
     * @returns 
     */
    get_class({num}={}){
        return get(`${ip}api/get/curriculum?pageNumber=${num}&pageSize=10`,num)
    },
    /**
     * 下拉框获取多条数据，pageSize=100
     * @param {*} param0 
     * @returns 
     */
    get_class1(){
        return get(`${ip}api/get/curriculum?pageNumber=1&pageSize=100`)
    },

    /**
     * 创建课程
     * @param {*} param0 
     * @returns 
     */
    create_class({data}={}){
        return post(`${ip}api/add/curriculum`,data)
    },

    /**
     * 修改课程
     * @param {*} param0 
     * @returns 
     */
    change_class({data}={}){
        return put(`${ip}api/update/curriculum`,data)
    },

    /**
     * 删除课程
     * @param {*} param0 
     * @returns 
     */
    delete_class({data}={}){
        return deletes(`${ip}api/delete/curriculum`,data)
    },
    

    /**
     * 获取课时
     * @returns 
     */
    get_period({num}={}){
        return get(`${ip}api/system/get/class/hour?pageNumber=${num}&pageSize=10`,num)
    },

    /**
     * 获取课时，pageSize为100
     * @param {*} param0 
     * @returns 
     */
    get_period1(){
        return get(`${ip}api/system/get/class/hour?pageNumber=1&pageSize=100`)
    },

    /**
     * 创建课时
     * @param {*} param0 
     * @returns 
     */
    create_period({data}={}){
        return post(`${ip}api/add/class/hour`,data)
    },

    /**
     * 修改课时
     * @param {*} param0 
     * @returns 
     */
    change_period({data}={}){
        return put(`${ip}api/update/class/hour`,data)
    },

    /**
     * 删除课时
     * @param {*} param0 
     * @returns 
     */
    delete_period({data}={}){
        return deletes(`${ip}api/delete/class/hour`,data)
    },

    /**
     * 线上线下课程状态更改
     * @param {*} param0 
     * @returns 
     */
    change_show({data}={}){
        return put(`${ip}api/show/curriculum`,data)
    },

    /**
     * 搜索线上线下课程
     * @param {*} param0 
     * @returns 
     */
    get_show({data,num}={}){
        return get(`${ip}api/get/show/list?show=${data}&pageNumber=${num}&pageSize=10`)
    },

    /**
     * 改变课时线上线下状态
     * @param {*} param0 
     * @returns 
     */
    change_show_period({data}={}){
        return put(`${ip}api/update/show/hour`,data)
    },

    /**
     * 
     * @param {*} param0 
     */
    get_show_period({data,num}={}){
        return get(`${ip}api/get/search/list?parentId=${data}&show=${num}`)
    },

    get_class_details({data}={}){
        return get(`${ip}api/get/note/details?parentId=${data}`)
    }
}