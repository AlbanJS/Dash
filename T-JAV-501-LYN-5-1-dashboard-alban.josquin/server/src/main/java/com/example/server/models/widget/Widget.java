package com.example.server.models.widget;

public class Widget {
    private String id;
    private String type;
    private Object params;

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object getParams() {
        return params;
    }

    public void setParams(Object params) {
        this.params = params;
    }

    public void setId(String id) {
        this.id = id;
    }
}
