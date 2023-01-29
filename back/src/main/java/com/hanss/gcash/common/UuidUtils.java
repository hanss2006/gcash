package com.hanss.gcash.common;

import java.util.UUID;

public class UuidUtils {

    public static String  newGuid(){
        return UUID.randomUUID().toString().replace("-", "");
    }
}
